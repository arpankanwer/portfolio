import 'package:flutter/material.dart';
import 'package:mysite/app/sections/work/work_desktop.dart';
import 'package:mysite/core/res/responsive.dart';


class Work extends StatelessWidget {
  const Work({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Responsive(
      mobile: WorkDesktop(),
      tablet: WorkDesktop(),
      desktop: WorkDesktop(),
    );
  }
}
