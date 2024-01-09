interface BarColors {
	[key: string]: string;
}

interface TopbarConfigOptions {
	autoRun?: boolean;
	barThickness?: number;
	barColors?: BarColors;
	shadowBlur?: number;
	shadowColor?: string;
	className?: string;
}

interface Topbar {
	config: (options: TopbarConfigOptions) => void;
	show: (delay?: number) => void;
	progress: (to?: number | string) => number;
	hide: () => void;
}

declare interface Window {
	topbar: Topbar;
	debashis: string;
}
