import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:servicegeniestore/ui/home/home_controller.dart';
import 'package:servicegeniestore/ui/widgets/service/ServiceHomeCard.dart';

class ServicesScreen extends StatelessWidget {
  final HomeController _homeController = Get.put(HomeController());

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Obx(
                () => CarouselSlider(
                  options: CarouselOptions(
                    height: 160.0,
                    enlargeCenterPage: true,
                    autoPlay: true,
                    aspectRatio: 16 / 9,
                    autoPlayCurve: Curves.fastOutSlowIn,
                    enableInfiniteScroll: true,
                    autoPlayAnimationDuration: Duration(milliseconds: 800),
                    viewportFraction: 0.8,
                  ),
                  items: _homeController.ads.map((ad) {
                    return Builder(
                      builder: (BuildContext context) {
                        return GestureDetector(
                          onTap: ad.associatedService != null
                              ? () {
                                  Get.toNamed(
                                      "/service/${ad.associatedService}/terms-and-conditions");
                                }
                              : null,
                          child: Container(
                            width: MediaQuery.of(context).size.width,
                            margin: EdgeInsets.symmetric(horizontal: 5.0),
                            decoration: BoxDecoration(
                              color: Colors.amber,
                            ),
                            child: Image.network(
                              ad.imageUrl,
                              fit: BoxFit.cover,
                            ),
                          ),
                        );
                      },
                    );
                  }).toList(),
                ),
              ),
              SizedBox(height: 24),
              _buildEngagementText(context),
              SizedBox(height: 8),
              Obx(() {
                return SingleChildScrollView(
                  child: ListView.builder(
                    shrinkWrap: true,
                    scrollDirection: Axis.vertical,
                    itemCount:
                        _homeController.servicesByCategoryId.value.keys.length,
                    itemBuilder: (context, index) {
                      final categoryId = _homeController
                          .servicesByCategoryId.value.keys
                          .toList()[index];
                      final category = _homeController.categories
                          .firstWhere((element) => element.id == categoryId);
                      final services = _homeController
                              .servicesByCategoryId.value[category.id] ??
                          [];
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(category.name.en,
                              style: Theme.of(context).textTheme.headlineSmall),
                          SizedBox(height: 10),
                          Container(
                            height: 200,
                            child: ListView.builder(
                                scrollDirection: Axis.horizontal,
                                itemCount: services.length,
                                itemBuilder: (context, index) {
                                  final service = services[index];
                                  return GestureDetector(
                                    onTap: () {
                                      Get.toNamed(
                                        '/service/${service.id}/terms-and-conditions',
                                        arguments: {"service": service},
                                      );
                                    },
                                    child: ServiceHomeCard(
                                      imageUrl: service.imageUrl,
                                      title: service.name.en,
                                      subtitle: service.description.en,
                                    ),
                                  );
                                }),
                          ),
                          Divider()
                        ],
                      );
                    },
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildEngagementText(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.discount,
                color: Theme.of(context).colorScheme.inversePrimary,
              ),
              SizedBox(
                width: 16,
              ),
              Expanded(
                child: Text(
                  'Get the best deals on home services. Check out our catelog of services and find the best deals for you.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
