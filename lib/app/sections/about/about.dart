import 'package:flutter/material.dart';
import 'package:mysite/app/sections/about/about_desktop.dart';
import 'package:mysite/core/res/responsive.dart';
import 'package:sizer/sizer.dart';

class About extends StatelessWidget {
  const About({super.key});

  @override
  Widget build(BuildContext context) {
    return Responsive(
      mobile: Padding(
        padding: EdgeInsets.only(top: 4.w),
        child: AboutDesktop(),
      ),
      tablet: AboutDesktop(),
      desktop: AboutDesktop(),
    );
  }
}
