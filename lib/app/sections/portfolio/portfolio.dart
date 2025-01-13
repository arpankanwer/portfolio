import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'portfolio_desktop.dart';
import 'portfolio_mobile.dart';
import 'package:mysite/core/res/responsive.dart';

class Portfolio extends StatelessWidget {
  const Portfolio({super.key});

  @override
  Widget build(BuildContext context) {
    return Responsive(
      mobile: Padding(
        padding: EdgeInsets.only(top: 6.w),
        child: PortfolioMobileTab(),
      ),
      tablet: PortfolioMobileTab(),
      desktop: PortfolioDesktop(),
    );
  }
}
