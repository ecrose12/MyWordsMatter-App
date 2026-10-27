// Draws a reading page (headings, paragraphs, lists, dividers, tables) in the
// same style as mywordsmatter.app's text pages (phone size).
// Used by the About page now, and by other reading pages later.

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Fonts, ThemeColors } from '@/constants/colors';
import { useTheme } from '@/context/theme';

export type ContentBlock =
  | { type: 'h1' | 'h2' | 'h3' | 'h4' | 'p'; text: string }
  | { type: 'hr' }
  | { type: 'ul'; items: string[] }
  | {
      type: 'ol';
      items: { title: string | null; body: string | null; bullets: string[] | null }[];
    }
  | { type: 'table'; head: string[]; rows: string[][] };

// Space above and below each kind of block, from the website.
// Like on the web, the space between two blocks is the larger of the two, not both added.
const SPACE: Record<ContentBlock['type'], { above: number; below: number }> = {
  h1: { above: 0, below: 24 },
  h2: { above: 32, below: 16 },
  h3: { above: 24, below: 12 },
  h4: { above: 20, below: 8 },
  p: { above: 0, below: 16 },
  ul: { above: 0, below: 20 },
  ol: { above: 0, below: 20 },
  hr: { above: 32, below: 32 },
  table: { above: 0, below: 24 },
};

// Table column widths, based on the website at phone size. The middle column is a
// little wider than the website's so long words like "communication" don't split.
const TABLE_COLUMN_WIDTHS = [95, 165, 110];

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  const { colors } = useTheme();

  return (
    <View>
      {blocks.map((block, i) => {
        const prev = i > 0 ? SPACE[blocks[i - 1].type].below : 0;
        const marginTop = i === 0 ? 0 : Math.max(prev, SPACE[block.type].above);
        const isLast = i === blocks.length - 1;
        return (
          <View key={i} style={{ marginTop, marginBottom: isLast ? SPACE[block.type].below : 0 }}>
            <Block block={block} colors={colors} />
          </View>
        );
      })}
    </View>
  );
}

function Block({ block, colors }: { block: ContentBlock; colors: ThemeColors }) {
  const text = { color: colors.text };

  switch (block.type) {
    case 'h1':
      return (
        <Text style={[styles.h1, text]} accessibilityRole="header">
          {block.text}
        </Text>
      );
    case 'h2':
      return (
        <Text style={[styles.h2, text]} accessibilityRole="header">
          {block.text}
        </Text>
      );
    case 'h3':
      return (
        <Text style={[styles.h3, text]} accessibilityRole="header">
          {block.text}
        </Text>
      );
    case 'h4':
      return (
        <Text style={[styles.h4, { color: colors.accentStrong }]} accessibilityRole="header">
          {block.text}
        </Text>
      );
    case 'p':
      return <Text style={[styles.p, text]}>{block.text}</Text>;
    case 'hr':
      return <View style={[styles.hr, { backgroundColor: colors.borderSubtle }]} />;
    case 'ul':
      return (
        <View style={styles.list}>
          {block.items.map((item, i) => (
            <Text key={i} style={[styles.p, text]}>
              {item}
            </Text>
          ))}
        </View>
      );
    case 'ol':
      return (
        <View style={styles.list}>
          {block.items.map((item, i) => (
            <View key={i}>
              {item.title && <Text style={[styles.itemTitle, text]}>{item.title}</Text>}
              {item.body && <Text style={[styles.p, text]}>{item.body}</Text>}
              {item.bullets && (
                <View style={styles.list}>
                  {item.bullets.map((b, j) => (
                    <Text key={j} style={[styles.p, text]}>
                      {b}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      );
    case 'table':
      return <Table head={block.head} rows={block.rows} colors={colors} />;
  }
}

function Table({ head, rows, colors }: { head: string[]; rows: string[][]; colors: ThemeColors }) {
  const lineColor = { borderBottomColor: colors.borderSubtle };
  return (
    // If the table is wider than the screen, it slides sideways (like the website).
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      style={[styles.tableWrap, { borderColor: colors.borderSubtle }]}>
      <View>
        <View style={[styles.tableRow, styles.tableLine, lineColor, { backgroundColor: colors.bgSubtle }]}>
          {head.map((cell, c) => (
            <Text
              key={c}
              style={[styles.cell, styles.headCell, { width: TABLE_COLUMN_WIDTHS[c], color: colors.text }]}>
              {cell}
            </Text>
          ))}
        </View>
        {rows.map((row, r) => (
          <View
            key={r}
            style={[styles.tableRow, r < rows.length - 1 && [styles.tableLine, lineColor]]}>
            {row.map((cell, c) => (
              <Text key={c} style={[styles.cell, { width: TABLE_COLUMN_WIDTHS[c], color: colors.text }]}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: Fonts.extraBold,
    fontSize: 28,
    lineHeight: 42,
    textAlign: 'center',
  },
  h2: {
    fontFamily: Fonts.extraBold,
    fontSize: 21.6,
    lineHeight: 32.4,
  },
  h3: {
    fontFamily: Fonts.bold,
    fontSize: 17.6,
    lineHeight: 26.4,
  },
  h4: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  p: {
    fontFamily: Fonts.regular,
    fontSize: 16.32,
    lineHeight: 26.93,
  },
  itemTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16.8,
    lineHeight: 26.88,
    marginBottom: 5.6,
  },
  hr: {
    height: 2,
  },
  list: {
    paddingLeft: 24,
    gap: 9.6,
  },
  tableWrap: {
    borderWidth: 2,
    borderRadius: 12,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableLine: {
    borderBottomWidth: 1,
  },
  cell: {
    fontFamily: Fonts.regular,
    fontSize: 15.2,
    lineHeight: 22.8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headCell: {
    fontFamily: Fonts.bold,
  },
});
