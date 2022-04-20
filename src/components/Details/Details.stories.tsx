import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Details } from ".";

export default {
  title: "Components/Details",
  component: Details,
} as ComponentMeta<typeof Details>;

const Template: ComponentStory<typeof Details> = (args) => (
  <Details {...args} />
);

export const Default = Template.bind({});
Default.args = {
  vehicle: {
    id: "5e0562c5-a50b-42ff-83e5-4c004c5b639a",
    manufacturer: "Volkswagen",
    model: "Explorer",
    type: "Cargo Van",
    fuel: "Gasoline",
    vin: "1USTAN9Z5MNT86399",
    color: "teal",
    mileage: 70609,
    registrationDate: "2005-07-08T16:58:36.380Z",
    registrationNumber: "TE52 HWW",
  },
};
