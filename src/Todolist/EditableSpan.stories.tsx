import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// @ts-ignore
import { Story, Meta } from '@storybook/react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
import { EditableSpan, EditableSpanPropsType } from './EditableSpan';

export default {
	title: 'Todolist/EditableSpan',
	component: EditableSpan,
	argTypes: {
		changeTaskTitle: {
			description: 'Value EditableSpan changed'
		},
		title: {
			defaultValue: 'HTML',
			description: 'Start EditableSpan changed'
		}
	}
} as Meta;

// @ts-ignore
const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
	changeTaskTitle: action('Value EditableSpan changed')
}

