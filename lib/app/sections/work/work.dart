import 'package:flutter/material.dart';
import 'package:mysite/app/sections/work/work_desktop.dart';
import 'package:mysite/app/sections/work/work_mobile.dart';
import 'package:mysite/core/res/responsive.dart';
import 'package:sizer/sizer.dart';

class Work extends StatelessWidget {
  const Work({super.key});

  @override
  Widget build(BuildContext context) {
    return Responsive(
      mobile: Padding(
        padding: EdgeInsets.only(top: 4.w),
        child: WorkMobile(),
      ),
      tablet: WorkDesktop(),
      desktop: WorkDesktop(),
    );
  }
}
