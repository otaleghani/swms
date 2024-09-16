# MPWC - Modules, Patterns, Wrapper, Components

This is a new React components organization aimed at making better, "DRY"er components.

## Components
The smallest element, it contains styles and basic logic. A good example is the shadcn/ui components. They are essentially a wrapper for basic HTML or more complex libraries like Radix. 

## Patterns
Patterns are basically collections of different components that are usually used together. Imagine that you have to build a form and in this form you always have for each input a label, a list of errors and the input itself. If you find yourself creating multiple times this kind of complex component that's a pattern.

## Wrappers
Wrappers are usually helper components that wrap other patterns or components. The idea of wrappers is to give an easy way to use complex nesting components, like for example the dialog component that it's found in shadcn/ui. A wraper accepts one or more components and renders them inside of a specific layout. 
The difference between patterns and wrappers is usually that wrappers are like the higher level compoment. You wrap patterns in wrappers, not the other way around.

## Modules
Modules are the final building block. Modules are the thing that you import in your pages. They handle the different wrappers and patterns.

Let's make an example of a header layout that has one element on the left and one on the right. On the left usually you have a title or breadcrumbs, on the right usually you have a button.

If you want to make a products header you'll create a component <ProductsHeader /> that has inside a <HeaderWrapper /> that contains the components that you need, let's say <BreadcrumbsPattern /> and <Button />.
