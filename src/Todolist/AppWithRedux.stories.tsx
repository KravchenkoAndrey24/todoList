import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// @ts-ignore
import { Story, Meta } from '@storybook/react';
// @ts-ignore
import { action } from '@storybook/addon-actions';
import AppWithRedux from '../AppWithRedux';
import { ReduxStoreProviderDecorator } from './../stories/ReduxStoreProviderDecorator'

export default {
	title: 'Todolist/AppWithRedux',
	component: AppWithRedux,
	decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story = () => <AppWithRedux />;


export const AppWithReduxExample = Template.bind({});

