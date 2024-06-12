import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ServicePropertyAnswerCard extends StatelessWidget {
  final int? number;
  final String? text;
  final DateTime? date;
  final String? timeRange;
  final bool selected;
  final void Function()? onTap;

  ServicePropertyAnswerCard(
      {this.number,
      this.text,
      this.date,
      this.timeRange,
      this.selected = true,
      this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.0),
          boxShadow: this.selected
              ? [
                  BoxShadow(
                    color: Theme.of(context)
                        .colorScheme
                        .inversePrimary
                        .withOpacity(0.7),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: Offset(0, 0),
                  ),
                ]
              : []),
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
        ),
        child: InkWell(
          borderRadius: BorderRadius.circular(16.0),
          onTap: this.onTap,
          child: Container(
            padding: EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (number != null) Text(number.toString()),
                if (text != null) Text(text!),
                if (date != null)
                  Column(
                    children: [
                      Text(
                          '${getWeekday(date!)}, ${date!.day} ${getMonth(date!)}'),
                    ],
                  ),
                if (timeRange != null) Text(timeRange!),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String getWeekday(DateTime date) {
    return DateFormat.EEEE().format(date).substring(0, 3);
  }

  String getMonth(DateTime date) {
    return DateFormat.MMMM().format(date);
  }
}
