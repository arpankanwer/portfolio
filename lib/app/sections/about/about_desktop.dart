import 'package:mysite/app/widgets/custom_text_heading.dart';
import 'package:sizer/sizer.dart';
import 'package:flutter/material.dart';
import 'package:mysite/changes/strings.dart';
import 'package:mysite/core/configs/configs.dart';

class AboutDesktop extends StatelessWidget {
  const AboutDesktop({super.key});

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: width / 8)
          .copyWith(bottom: height * 0.2),
      child: Column(
        children: [
          Space.y(4.w)!,
          const CustomSectionHeading(text: '\nAbout Me'),
          Space.y(1.w)!,
          const CustomSectionSubHeading(text: aboutMeDetail),
          Space.y(2.w)!,
          Wrap(
            spacing: width * 0.03,
            runSpacing: height * 0.05,
            alignment: WrapAlignment.start,
            crossAxisAlignment: WrapCrossAlignment.start,
            children: const [
              Text("- Birarpanjot Singh"),
            ],
          ),
        ],
      ),
    );
  }
}
