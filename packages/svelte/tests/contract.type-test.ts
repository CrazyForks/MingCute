import type { FrameworkAdapter } from '@mingcute/core';
import type { Component } from 'svelte';
import { Icon, type IconDataProps, type IconProps } from '@mingcute/svelte';
import { Home1Regular } from '@mingcute/svelte/core-regular';
import HomeDirect from '@mingcute/svelte/core-regular/home-1';
import { svelteAdapter } from '../src/tooling/adapter.js';

const adapter: FrameworkAdapter = svelteAdapter;
const icon: Component<IconDataProps> = Icon;
const home: Component<IconProps> = Home1Regular;
const direct: Component<IconProps> = HomeDirect;
void [adapter, icon, home, direct];
