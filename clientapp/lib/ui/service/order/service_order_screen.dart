import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/UI/widgets/SGFilledButton.dart';
import 'package:servicegeniestore/ui/service/service_controller.dart';
import 'package:servicegeniestore/ui/widgets/service/ServicePropertyAnswerCard.dart';

class ServiceOrderScreen extends StatelessWidget {
  final _controller = Get.find<ServiceController>();
  final dateScrollController = ScrollController();
  final timeScrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final service = _controller.service.value!;
      return Scaffold(
        appBar: AppBar(
          title: Text(service.name.en),
        ),
        body: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Obx(() {
                return SingleChildScrollView(
                  child: ListView.builder(
                      shrinkWrap: true,
                      scrollDirection: Axis.vertical,
                      itemCount: _controller.properties.value.length,
                      itemBuilder: (item, index) {
                        final property = _controller.properties.value[index];
                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(property.name.en,
                                style: TextStyle(fontWeight: FontWeight.bold)),
                            SizedBox(height: 16.0),
                            Container(
                              height: 60.0,
                              child: ListView.separated(
                                shrinkWrap: true,
                                scrollDirection: Axis.horizontal,
                                itemCount: property.options.length,
                                itemBuilder: (item, index) {
                                  final option = property.options[index];
                                  return Obx(() {
                                    return property.type == "text"
                                        ? ServicePropertyAnswerCard(
                                            selected: _controller
                                                    .getOption(property.id) ==
                                                option,
                                            text: option["en"],
                                            onTap: () {
                                              _controller.setOption(
                                                  property.id, option);
                                            })
                                        : ServicePropertyAnswerCard(
                                            number: option);
                                  });
                                },
                                separatorBuilder:
                                    (BuildContext context, int index) {
                                  return SizedBox(width: 16);
                                },
                              ),
                            ),
                            SizedBox(height: 16.0),
                          ],
                        );
                      }),
                );
              }),
              SizedBox(height: 16.0),
              // Question 3
              Text('Select a date:',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              SizedBox(
                height: 60.0,
                child: Scrollbar(
                  controller: dateScrollController,
                  thumbVisibility: true,
                  child: SingleChildScrollView(
                    controller: dateScrollController,
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: _controller.availableTimeSlotsMap.keys
                          .map((key) => ServicePropertyAnswerCard(
                                date: key,
                                selected: _controller.selectedDate.value == key,
                                onTap: () {
                                  _controller.selectedDate.value = key;
                                },
                              ))
                          .toList(),
                    ),
                  ),
                ),
              ),
              if (_controller.selectedDate.value != null) ...[
                Text('Select a time slot:',
                    style: TextStyle(fontWeight: FontWeight.bold)),
                SizedBox(
                  height: 60.0,
                  child: Scrollbar(
                    controller: timeScrollController,
                    thumbVisibility: true,
                    child: SingleChildScrollView(
                      controller: timeScrollController,
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: _controller.availableTimeSlotsMap[
                                _controller.selectedDate.value]!
                            .map((slot) => ServicePropertyAnswerCard(
                                  text: slot,
                                  selected:
                                      _controller.selectedTimeSlot.value ==
                                          slot,
                                  onTap: () {
                                    _controller.selectedTimeSlot.value = slot;
                                  },
                                ))
                            .toList(),
                      ),
                    ),
                  ),
                ),
              ] else
                SizedBox.shrink(),
              SizedBox(height: 16.0),
              Text('Additional Notes:',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              TextField(
                controller: _controller.notesTextController,
                decoration: InputDecoration(
                  hintText: 'Type your notes here...',
                  border: OutlineInputBorder(),
                ),
                minLines: 3,
                maxLines: 5,
              ),
              SizedBox(height: 16.0),
              // Price and Next Button
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: SGFilledButton(
                      onPressed: () {
                        Get.toNamed(
                            '/service/${_controller.serviceId}/checkout');
                      },
                      text: 'Next',
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    });
  }
}
