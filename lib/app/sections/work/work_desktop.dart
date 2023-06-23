import 'package:flutter/material.dart';
import 'package:mysite/app/utils/work_util.dart';
import 'package:mysite/app/widgets/custom_text_heading.dart';
import 'package:mysite/core/configs/others/space.dart';
import 'package:sizer/sizer.dart';

class WorkDesktop extends StatelessWidget {
  const WorkDesktop({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        children: [
          const CustomSectionHeading(text: '\nWorks'),
          Space.y(1.w)!,
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Expanded(
                child: WorkCard(
                  title: 'Application Developer',
                  company: 'Eduwings Global',
                  location: 'Ludhiana, India',
                  duration: 'August 2021 - November 2021',
                  description:
                      'I was given project to create Application for the firm and i have used Flutter technology to create Android App. I have also used Firebase for backend and database. I have also used Google Map API for location tracking and Google Calendar API for scheduling.',
                ),
              ),
              SizedBox(width: 20.0),
              Expanded(
                child: WorkCard(
                  title:
                      'Applied Computing Full Time Tutor (Presently Part-Time)',
                  company: 'Sheridan College',
                  location: 'Brampton, CA',
                  duration: 'January 2023 - Present',
                  description:
                      'Provided tutorials, one-on-one and group sessions in Java, PHP and MySQL. Assisted students with their assignments and projects. Helped students with their lab work and assignments. Provided feedback to students on their assignments and projects.',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
