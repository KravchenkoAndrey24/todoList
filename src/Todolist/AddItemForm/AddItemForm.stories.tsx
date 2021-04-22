import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { Story, Meta } from '@storybook/react';
import { AddItemForm, AddItemFormPropsType } from './AddItemForm';

import { action } from '@storybook/addon-actions';

export default {
	title: 'Todolist/AddItemForm',
	component: AddItemForm,
	argTypes: {
		onClick: {
			description: 'Button inside form clicled'
		}
	},
} as Meta;
// @ts-ignore
const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;


export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
	addItem: action('Button inside form clicled')
}