# Frontend

## Setup

1. Install Node.js
2. In the frontend directory (`/frontend`), run `npm install` to install dependencies. If you don't have npm installed, restart your terminal/command prompt and try again. Might also need a computer reboot.
3. Install the following extensions in VSCode:
    - EditorConfig for VS Code (Needed for .editorconfig to format code)
    - Prettier - Code formatter (Needed for formatting code)
    - ESLint (Needed for linting)
    - IntelliCode (Optional, but useful for autocomplete)

4. Restart editor (Ctrl+Shift+P -> Reload Window)

## Development

Run `npm run dev` to start the development server. The server will be available at `http://localhost:3000`.

## Code formatting

Press `Ctrl+Shift+I` to format the code.

## Typing

This project uses TypeScript. Make sure to type your code.
PLEASE don't use `any` type unless you have a good reason to do so. Could be with 3rd party libraries or when prototyping locally.

### Some examples

1. useState-hook
```typescript
const [value, setValue] = useState<string>('');
const [value, setValue] = useState<number>(0);
const [value, setValue] = useState<boolean>(false);
const [value, setValue] = useState<null | string>(null);
const [value, setValue] = useState<undefined | string>(undefined);
// if type can be null or undefined, can be defined also just with empty ()
const [value, setValue] = useState<{ name: string, age: number }>({
    name: '',
    age: 0
});
```

2. Props
```typescript
interface ComponentProps {
    name: string;
    age: number;
}

function Component({ name, age }: ComponentsProps) {
  ...
}

function ComponentWithoutNamedProps(props: ComponentsProps) {
  const { name, age } = props;
  const name2 = props.name;
  const age2 = props.age;
  ...
}
```

3. Functions
```typescript
// Both of these typings are okay
// function add(a: number, b: number): number
function add({ a, b }: { a: number; b: number; }): number {
  return a + b;
}

add({ a: 1, b: 2 }); // 3

const add2 = (a: number, b: number): number => a + b;

add2(1, 2); // 3
// Arrow function is extremely useful to use (at least less boilerplate)
// Just remember that it always returns something in the background (undefined if not specified)

const addHTML = (divText: string) => <div>{divText}</div>;

addHTML('Hello, world!'); // <div>Hello, world!</div>
```

4. Combining types

```typescript
type Person = {
    name: string;
    age: number;
}

interface Company {
    name: string;
    employees: Person[];
}
```
Note! Distinction between `type` and `interface` is a bit blurry. Use `type` for more complex types and `interface` for simpler ones. We can mostly use `interface` for everything because we shouldn't have that complicated types.
