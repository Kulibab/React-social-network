import React from "react";
import { create , act } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props to state", () => {
        let component;
        act(() => {
          component = create(<ProfileStatus status="lalala" />);
        });
      const instance = component.root;
      const button = instance.findByType("div");
      debugger;
      expect(button.state.status).toBe("lalala");
    });
  });