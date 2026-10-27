// The ☰ menu button and its drop-down list, copied from mywordsmatter.app.
//   Home · Take a Tour · About ▼ · Resource Links · Account ▼ · Settings · Contact Support
// "About" and "Account" open smaller lists underneath them.
// The menu closes when you tap ☰ again, tap anywhere outside it, or pick an item.
//
// Working so far: opening/closing, the About and Account lists, Home,
// About My Words Matter, Meet the Creators, Coming Soon, Resource Links, Settings,
// and Contact Support.
// The other items close the menu but don't go anywhere yet; their pages
// will be added in later steps.

import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { Fonts } from '@/constants/colors';
import { useTheme } from '@/context/theme';

const GAP_BELOW_BUTTON = 8; // space between the ☰ button and the list, like the website

type Position = { top: number; left: number };

export function NavMenu() {
  const { colors } = useTheme();
  const { height: screenHeight } = useWindowDimensions();
  const buttonRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  function openMenu() {
    // Find where the ☰ button is on screen, so the list drops down right under it.
    buttonRef.current?.measureInWindow((x, y, _width, height) => {
      setPosition({ top: y + height + GAP_BELOW_BUTTON, left: x });
      setOpen(true);
    });
  }

  function closeMenu() {
    setOpen(false);
    setAboutOpen(false);
    setAccountOpen(false);
  }

  function goHome() {
    closeMenu();
    router.navigate('/');
  }

  function goTo(
    page: '/about' | '/team' | '/coming-soon' | '/resources' | '/settings' | '/support',
  ) {
    closeMenu();
    router.navigate(page);
  }

  // Pages that aren't built yet: for now, just close the menu.
  const notBuiltYet = closeMenu;

  const itemText = [styles.itemText, { color: colors.text }];
  const subItemText = [styles.subItemText, { color: colors.text }];
  const divider = <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />;

  return (
    <>
      <Pressable
        ref={buttonRef}
        onPress={open ? closeMenu : openMenu}
        accessibilityRole="button"
        accessibilityLabel="Menu"
        aria-expanded={open}
        style={[styles.menuButton, { backgroundColor: colors.bg, borderColor: colors.border }]}>
        <Text style={[styles.menuIcon, { color: colors.text }]}>☰</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="none" statusBarTranslucent onRequestClose={closeMenu}>
        {/* Tapping anywhere outside the list closes the menu */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeMenu}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />

        <View
          accessibilityRole="menu"
          style={[
            styles.dropdown,
            {
              top: position.top,
              left: position.left,
              maxHeight: screenHeight - position.top - 24,
              backgroundColor: colors.bg,
              borderColor: colors.border,
            },
          ]}>
          <ScrollView bounces={false}>
            <MenuItem label="Home" onPress={goHome} textStyle={itemText} />
            {divider}
            <MenuItem label="Take a Tour" onPress={notBuiltYet} textStyle={itemText} />
            {divider}
            <ToggleItem
              label="About"
              expanded={aboutOpen}
              onPress={() => setAboutOpen(!aboutOpen)}
              textStyle={itemText}
            />
            {aboutOpen && (
              <View style={[styles.subMenu, { borderLeftColor: colors.borderSubtle }]}>
                <MenuItem label="About My Words Matter" onPress={() => goTo('/about')} textStyle={subItemText} sub />
                <MenuItem label="Meet the Creators" onPress={() => goTo('/team')} textStyle={subItemText} sub />
                <MenuItem label="Coming Soon" onPress={() => goTo('/coming-soon')} textStyle={subItemText} sub />
              </View>
            )}
            {divider}
            <MenuItem label="Resource Links" onPress={() => goTo('/resources')} textStyle={itemText} />
            {divider}
            <ToggleItem
              label="Account"
              expanded={accountOpen}
              onPress={() => setAccountOpen(!accountOpen)}
              textStyle={itemText}
            />
            {accountOpen && (
              <View style={[styles.subMenu, { borderLeftColor: colors.borderSubtle }]}>
                <MenuItem label="Log In" onPress={notBuiltYet} textStyle={subItemText} sub />
                <MenuItem label="Sign Up" onPress={notBuiltYet} textStyle={subItemText} sub />
              </View>
            )}
            {divider}
            <MenuItem label="Settings" onPress={() => goTo('/settings')} textStyle={itemText} />
            {divider}
            <MenuItem label="Contact Support" onPress={() => goTo('/support')} textStyle={itemText} />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

type ItemProps = {
  label: string;
  onPress: () => void;
  textStyle: object[];
  sub?: boolean;
};

function MenuItem({ label, onPress, textStyle, sub }: ItemProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="menuitem"
      style={sub ? styles.subItem : styles.item}>
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}

function ToggleItem({
  label,
  expanded,
  onPress,
  textStyle,
}: {
  label: string;
  expanded: boolean;
  onPress: () => void;
  textStyle: object[];
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      aria-expanded={expanded}
      style={[styles.item, styles.toggleItem]}>
      <Text style={textStyle}>{label}</Text>
      <Text style={[textStyle, styles.caret]} accessibilityElementsHidden importantForAccessibility="no">
        {expanded ? '▲' : '▼'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    width: 48,
    height: 48,
    borderWidth: 3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20.8,
  },
  dropdown: {
    position: 'absolute',
    width: 200,
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 8,
    // soft shadow, like the website
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  item: {
    minHeight: 48,
    marginHorizontal: 8,
    paddingVertical: 9.6,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16.8,
  },
  caret: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginVertical: 5.6,
    marginHorizontal: 12,
  },
  subMenu: {
    marginLeft: 20,
    marginRight: 8,
    borderLeftWidth: 2,
    paddingLeft: 8,
  },
  subItem: {
    minHeight: 44,
    paddingVertical: 9.6,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  subItemText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
});
