import { create } from 'twrnc';

const tailwindStyles = create(require(`../../tailwind.config.js`));

const tailwind = (styles) => tailwindStyles`${styles}`;

export default tailwind;
