# Contributing

1.  [Fork it](https://help.github.com/articles/fork-a-repo/)
2.  Install dependencies (`npm install`)
3.  Create your feature branch (`git checkout -b feature/new-one`)
4.  Commit your changes (`git commit -am 'Added some feature'`) _**please see below how to write commit messages**_
5.  Test your changes (`npm test`)
6.  Push to the branch (`git push origin feature/new-one`)
7.  [Create new Pull Request](https://help.github.com/articles/creating-a-pull-request/)

## Testing

We use [TAP](https://github.com/tapjs/node-tap) to write tests. Run our test suite with this command:

    npm test

## Code Style

We use [standard](https://www.npmjs.com/package/standard) and [editorconfig](http://editorconfig.org) / [prettier](https://prettier.io) to maintain code style and best practices. Please make sure your PR adheres to the guides by running:

    npm run lint
