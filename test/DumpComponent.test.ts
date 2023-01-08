import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DumpComponent from "../src/components/DumpComponent.vue";

describe("DumpComponent", () => {
  it("displays a message", () => {
    const wrapper = mount(DumpComponent, {
      propsData: {
        message: "Test message",
      },
    });

    expect(wrapper.find(".message-container").text()).equal("Test message");
  });

  it("displays message an empty message", () => {
    const wrapper = mount(DumpComponent, {
      propsData: {
        message: "",
      },
    });

    expect(wrapper.find(".message-container").text()).equal("");
  });

  it("doesn't display a message if no props provided", () => {
    const wrapper = mount(DumpComponent);

    expect(wrapper.find(".message-container").text()).equal("");
  });
});
