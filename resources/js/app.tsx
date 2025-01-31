import './bootstrap';

import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import DefaultLayout from "@/Layouts/DefaultLayout";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {ReactNode} from "react";

createInertiaApp({
    resolve: (name) => {
      const page = resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx')
      );
      page.then((module) => {
        // @ts-ignore
        module.default.layout = module.default.layout || ((page: ReactNode) => <DefaultLayout children={page}/>);
      });
      return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
