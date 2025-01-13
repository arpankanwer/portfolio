import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:mysite/app/widgets/color_chage_btn.dart';
import 'package:mysite/changes/img.dart';
import 'package:mysite/changes/links.dart';
import 'package:mysite/changes/strings.dart';
import 'package:mysite/core/animations/entrance_fader.dart';
import 'package:mysite/core/animations/zoom_animation.dart';
import 'package:mysite/core/configs/configs.dart';
import 'package:mysite/core/res/responsive_size.dart';
import 'package:sizer/sizer.dart';
import 'package:url_launcher/url_launcher.dart';

import 'widgets/animation_text.dart';

class HomeMobile extends StatelessWidget {
  const HomeMobile({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 95.h,
      child: Padding(
        padding: EdgeInsets.only(right: 10.w, left: 10.w, top: 30.h),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisSize: MainAxisSize.max,
              children: [
                Text(
                  hellotag,
                  style:
                      AppText.h3!.copyWith(fontSize: isFontSize(context, 16)),
                ),
                // Space.x!,
                Image.asset(StaticImage.hi, height: 10.sp),
              ],
            ),
            Space.y(4.w)!,
            Text(
              yourname,
              style: TextStyle(
                fontSize: isFontSize(context, 28),
                fontWeight: FontWeight.w600,
              ),
            ),
            Space.y(2.w)!,
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    AnimatedTextKit(
                      animatedTexts: mobileList,
                      repeatForever: true,
                      isRepeatingAnimation: true,
                    ),
                    Space.y(6.w)!,
                    ColorChageButton(
                      text: 'download cv',
                      onTap: () async {
                        final Uri resumeUrl = Uri.parse(resume);
                        if (await canLaunchUrl(resumeUrl)) {
                          await launchUrl(resumeUrl);
                        }
                      },
                    ),
                  ],
                ),
                const EntranceFader(
                  offset: Offset(0, -30),
                  // delay: Duration(seconds: 1),
                  duration: Duration(milliseconds: 100),
                  child: ZoomAnimations(),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
