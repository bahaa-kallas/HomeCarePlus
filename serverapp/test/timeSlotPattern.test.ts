import { describe, expect, test } from "@jest/globals";
import timeSlotPattern from "../src/domain/shared/TimeSlotPattern.js";


describe("Time Slot Regex Pattern", () => {
  test("should match valid time slots", () => {
    const validTimeSlots = [
      "08:00-10:00",
      "07:15-09:45",
      "00:00-23:59",
      "12:30-13:30",
      "01:00-03:00",
      "23:00-23:59",
    ];

    validTimeSlots.forEach((slot) => {
      expect(timeSlotPattern.test(slot)).toBe(true);
    });
  });

  test("should not match invalid time slots", () => {
    const invalidTimeSlots = [
      "8:00-10:00",     // Missing leading zero
      "08:0-10:00",     // Missing leading zero in minutes
      "08:00-10:0",     // Missing leading zero in minutes
      "08:00-25:00",    // Invalid hour
      "24:00-25:00",    // Invalid hour
      "08:60-10:00",    // Invalid minute
      "08:00-10:60",    // Invalid minute
      "0800-1000",      // Missing colon
      "08:00-10:00am",  // Extra characters
      "08:00-10",       // Incomplete time slot
      "08-10:00",       // Incomplete time slot
    ];

    invalidTimeSlots.forEach((slot) => {
      expect(timeSlotPattern.test(slot)).toBe(false);
    });
  });
});
