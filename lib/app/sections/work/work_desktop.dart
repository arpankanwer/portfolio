import 'package:flutter/material.dart';
import 'package:mysite/app/utils/work_util.dart';
import 'package:mysite/app/widgets/custom_text_heading.dart';
import 'package:mysite/core/configs/others/space.dart';
import 'package:sizer/sizer.dart';

class WorkDesktop extends StatelessWidget {
  const WorkDesktop({super.key});

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;

    return Container(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        children: [
          const CustomSectionHeading(text: '\nWorks'),
          Space.y(1.w)!,
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: screenWidth * 0.45,
                child: WorkCard(
                  title: 'Software QA (Quality Assurance) Engineer',
                  company: 'Evertz Microsystems',
                  location: 'Burlington, Canada',
                  duration: 'January - April 2024',
                  description:
                      'Developed innovative products using Python scripts and ReactJS for web UI. Collaborated with cross-functional teams to create full-fledged web interfaces. Tested multiple products using XPS hardware machines and managed extensive server configurations.',
                ),
              ),
              SizedBox(width: 20.0),
              SizedBox(
                width: screenWidth * 0.45,
                child: WorkCard(
                  title: 'Programming/Software Tutor',
                  company: 'Sheridan College',
                  location: 'Brampton, Canada',
                  duration: 'September - December 2023',
                  description:
                      'Conduct tutorials and mentoring sessions in Python, Swift, Kotlin, and MongoDB. Help students with assignments, focusing on debugging, database optimization, and advanced programming concepts. Provide feedback to improve their understanding of modern tools and practices.',
                ),
              ),
            ],
          ),
          SizedBox(height: 20.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: screenWidth * 0.45,
                child: WorkCard(
                  title: 'Programming/Software Tutor',
                  company: 'Sheridan College',
                  location: 'Brampton, Canada',
                  duration: 'January - April 2023',
                  description:
                      'Led tutorials and one-on-one sessions in Java, PHP, and MySQL. Supported students in lab work, projects, and assignments, emphasizing coding fundamentals and database management. Provided actionable feedback to foster growth and improve their skills.',
                ),
              ),
              SizedBox(width: 20.0),
              SizedBox(
                width: screenWidth * 0.45,
                child: WorkCard(
                  title: 'Application Developer',
                  company: 'Eduwings Global',
                  location: 'Ludhiana, India',
                  duration: 'August 2021 - November 2021',
                  description:
                      'Designed and developed an Android application for the firm using Flutter. Integrated Firebase for backend services and database management. Utilized Google Maps API for real-time location tracking and Google Calendar API for scheduling functionality.',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
