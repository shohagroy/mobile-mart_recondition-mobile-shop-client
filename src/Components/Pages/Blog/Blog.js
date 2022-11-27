import React from "react";
import { Helmet } from "react-helmet";

const Blog = () => {
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Blog -Travel Point Holiday</title>
      </Helmet>
      <section className="max-w-[1200px] min-h-[700px] m-auto p-5 md:p-20 bg-gray-50 text-gray-900">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">
            Assignment Question
          </h2>
          <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-10 divide-gray-700">
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What are the different ways to manage a state in a React
                application?
              </summary>

              <div className="px-4 pb-4">
                <h3 className="font-semibold">
                  The Four Kinds of React State to Manage
                </h3>
                <p>
                  When we talk about state in our applications, it’s important
                  to be clear about what types of state actually matter.
                </p>

                <p>
                  There are four main types of state you need to properly manage
                  in your React apps:
                </p>
                <ul>
                  <ol className="font-semibold">1. Local state</ol>
                  <ol className="font-semibold">2. Global state</ol>
                  <ol className="font-semibold">3. Server state</ol>
                  <ol className="font-semibold">4. URL state</ol>
                </ul>

                <h2 className="font-bold">
                  {" "}
                  Let's cover each of these in detail:
                </h2>

                <p>
                  Local (UI) state – Local state is data we manage in one or
                  another component.
                </p>

                <p>
                  Local state is most often managed in React using the useState
                  hook.
                </p>
                <p>
                  For example, local state would be needed to show or hide a
                  modal component or to track values for a form component, such
                  as form submission, when the form is disabled and the values
                  of a form’s inputs.
                </p>
                <p>
                  Global (UI) state – Global state is data we manage across
                  multiple components.
                </p>
                <p>
                  Global state is necessary when we want to get and update data
                  anywhere in our app, or in multiple components at least.
                </p>
                <p>
                  A common example of global state is authenticated user state.
                  If a user is logged into our app, it is necessary to get and
                  change their data throughout our application.
                </p>
                <p>
                  Sometimes state we think should be local might become global.
                </p>
                <p>
                  Server state – Data that comes from an external server that
                  must be integrated with our UI state.
                </p>

                <p>
                  Server state is a simple concept, but can be hard to manage
                  alongside all of our local and global UI state.
                </p>

                <p>
                  There are several pieces of state that must be managed every
                  time you fetch or update data from an external server,
                  including loading and error state.
                </p>
                <p>
                  Fortunately there are tools such as SWR and React Query that
                  make managing server state much easier.
                </p>
                <p>
                  URL state – Data that exists on our URLs, including the
                  pathname and query parameters.
                </p>
                <p>
                  URL state is often missing as a category of state, but it is
                  an important one. In many cases, a lot of major parts of our
                  application rely upon accessing URL state. Try to imagine
                  building a blog without being able to fetch a post based off
                  of its slug or id that is located in the URL!
                </p>
                <p>
                  There are undoubtedly more pieces of state that we could
                  identify, but these are the major categories worth focusing on
                  for most applications you build.
                </p>
              </div>
            </details>

            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                How does prototypical inheritance work?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  The Prototypal Inheritance is a feature in javascript used to
                  add methods and properties in objects. It is a method by which
                  an object can inherit the properties and methods of another
                  object. Traditionally, in order to get and set the
                  [[Prototype]] of an object, we use Object.
                </p>
              </div>
            </details>

            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What is a Unit Test? Why should we write unit tests?
              </summary>

              <div className="px-4 pb-4">
                <p>
                  A unit test is a way of testing a unit - the smallest piece of
                  code that can be logically isolated in a system. In most
                  programming languages, that is a function, a subroutine, a
                  method or property. The isolated part of the definition is
                  important.
                </p>
                <p>
                  The main objective of unit testing is to isolate written code
                  to test and determine if it works as intended. Unit testing is
                  an important step in the development process, because if done
                  correctly, it can help detect early flaws in code which may be
                  more difficult to find in later testing stages.
                </p>
              </div>
            </details>

            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                React vs. Angular vs. Vue?
              </summary>

              <div className="px-4 pb-4">
                <div>
                  <h3 className="text-xl font-semibold mt-3">React</h3>
                  <p className="my-2">
                    React can be used as a UI library to render elements,
                    without enforcing a specific project structure, and that’s
                    why it’s not strictly a framework.
                  </p>
                  <p>
                    React Elements are the smallest building blocks of React
                    apps. They are more powerful than DOM elements because the
                    React DOM makes sure to update them efficiently whenever
                    something changes.
                  </p>
                  <p>
                    Components are larger building blocks that define
                    independent and reusable pieces to be used throughout the
                    application. They accept inputs called props and produce
                    elements that are then displayed to the user.
                  </p>
                  <p>
                    React is based on JavaScript, but it’s mostly combined with
                    JSX (JavaScript XML), a syntax extension that allows you to
                    create elements that contain HTML and JavaScript at the same
                    time.
                  </p>
                  <p>
                    Anything you create with JSX could also be created with the
                    React JavaScript API, but most developers prefer JSX because
                    it’s more intuitive.
                  </p>
                  <br />
                  <h3 className="text-xl font-semibold mt-3">Vue</h3>
                  <p className="my-2">
                    The Vue.js core library focuses on the View layer only. It’s
                    called a progressive framework because you can extend its
                    functionality with official and third-party packages, such
                    as Vue Router or Vuex, to turn it into an actual framework.
                  </p>
                  <p>
                    Although Vue is not strictly associated with the MVVM
                    (Model-View-ViewModel) pattern, its design was partly
                    inspired by it. With Vue, you’ll be working mostly on the
                    ViewModel layer, to make sure that the application data is
                    processed in a way that allows the framework to render an
                    up-to-date View.
                  </p>
                  <p>
                    Vue’s templating syntax lets you create View components, and
                    it combines familiar HTML with special directives and
                    features. This templating syntax is preferred, even though
                    raw JavaScript and JSX are also supported.
                  </p>
                  <p>
                    Components in Vue are small, self-contained, and can be
                    reused throughout the application. Single File Components
                    (SFCs) with the .vue extension contain HTML, CSS, and
                    JavaScript so that all relevant code resides in one file.
                  </p>
                  <p>
                    SFCs are the recommended way to organize code in Vue.js
                    projects, especially larger ones. Tools such as Webpack or
                    Browserify are required to transpile SFCs into working
                    JavaScript code.
                  </p>
                  <br />
                  <h3 className="text-xl font-semibold mt-3">Angular</h3>
                  <p className="my-2">
                    AngularJS, the original framework, is an MVC
                    (Model-View-Controller)) framework. But in Angular 2,
                    there’s no strict association with MV*-patterns as it is
                    also component-based.
                  </p>
                  <p>
                    Projects in Angular are structured into Modules, Components,
                    and Services. Each Angular application has at least one root
                    component and one root module.
                  </p>

                  <p>
                    Each component in Angular contains a Template, a Class that
                    defines the application logic, and MetaData (Decorators).
                    The metadata for a component tells Angular where to find the
                    building blocks that it needs to create and present its
                    view.
                  </p>
                  <p>
                    Angular templates are written in HTML but can also include
                    Angular template syntax with special directives to output
                    reactive data and render multiple elements, among other
                    things.
                  </p>
                  <p>
                    Services in Angular are used by Components to delegate
                    business-logic tasks such as fetching data or validating
                    input. They are a distinct part of Angular applications.
                    While Angular doesn’t enforce their use, it’s highly
                    suggested to structure apps as a set of distinct services
                    that can be reused.
                  </p>
                  <p>
                    Angular is built in TypeScript, so its use is recommended to
                    get the most seamless experience, but plain JavaScript is
                    also supported.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
