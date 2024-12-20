import 'package:flutter/material.dart';
import 'package:mysite/core/color/colors.dart';

class AppTheme {
  static ThemeData themeData(bool isDarkTheme, BuildContext context) {
    return isDarkTheme ? ThemeColors.darkTheme : ThemeColors.lightTheme;
  }
}

class ThemeColors {
  const ThemeColors._();

  static final lightTheme = ThemeData(
    useMaterial3: true, // Enable Material 3
    brightness: Brightness.light,
    fontFamily: 'Poppins',
    colorSchemeSeed: primaryColor, // Use colorSchemeSeed
    scaffoldBackgroundColor: lightBackgroundColor,
    visualDensity: VisualDensity.adaptivePlatformDensity,
    appBarTheme: AppBarTheme(
      backgroundColor: lightBackgroundColor,
      titleTextStyle:
          TextStyle(color: lightTextColor), // Set text style for title
      iconTheme: IconThemeData(color: lightTextColor),
    ),
    textTheme: TextTheme(
      labelLarge: TextStyle(color: lightTextColor),
      bodyMedium: TextStyle(color: lightTextColor),
      bodySmall: TextStyle(color: lightTextColor),
      bodyLarge: TextStyle(color: lightTextColor),
      displayLarge: TextStyle(color: lightTextColor),
      displayMedium: TextStyle(color: lightTextColor),
      displaySmall: TextStyle(color: lightTextColor),
      headlineMedium: TextStyle(color: lightTextColor),
      headlineSmall: TextStyle(color: lightTextColor),
      headlineLarge: TextStyle(color: lightTextColor),
      titleLarge: TextStyle(color: lightTextColor),
      titleMedium: TextStyle(color: lightTextColor),
      titleSmall: TextStyle(color: lightTextColor),
    ),
  );

  static final darkTheme = ThemeData(
    useMaterial3: true, // Enable Material 3
    brightness: Brightness.dark,
    fontFamily: 'Poppins',
    colorSchemeSeed: primaryColor, // Use colorSchemeSeed
    scaffoldBackgroundColor: const Color(0xFF00040F),
    visualDensity: VisualDensity.adaptivePlatformDensity,
    appBarTheme: AppBarTheme(
      backgroundColor: darkBackgroundColor,
      titleTextStyle: TextStyle(color: darkTextColor),
      iconTheme: IconThemeData(color: darkTextColor),
    ),
    textTheme: TextTheme(
      labelLarge: TextStyle(color: darkTextColor),
      bodyMedium: TextStyle(color: darkTextColor),
      bodySmall: TextStyle(color: darkTextColor),
      bodyLarge: TextStyle(color: darkTextColor),
      displayLarge: TextStyle(color: darkTextColor),
      displayMedium: TextStyle(color: darkTextColor),
      displaySmall: TextStyle(color: darkTextColor),
      headlineMedium: TextStyle(color: darkTextColor),
      headlineSmall: TextStyle(color: darkTextColor),
      headlineLarge: TextStyle(color: darkTextColor),
      titleLarge: TextStyle(color: darkTextColor),
      titleMedium: TextStyle(color: darkTextColor),
      titleSmall: TextStyle(color: darkTextColor),
    ),
  );
}

extension ThemeExtras on ThemeData {
  Color get navBarColor => brightness == Brightness.light
      ? const Color(0xffF0F0F0)
      : const Color(0xFF00040F);

  Color get textColor => brightness == Brightness.light
      ? const Color(0xFF403930)
      : const Color(0xFFFFF8F2);

  Color get secondaryColor =>
      colorScheme.secondary; // Use colorScheme.secondary

  Gradient get serviceCard =>
      brightness == Brightness.light ? grayWhite : grayBack;

  Gradient get contactCard =>
      brightness == Brightness.light ? grayWhite : contactGradi;
}
