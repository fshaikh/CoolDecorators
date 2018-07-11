import log from "./Core/log";

console.log('before');
class Test {
    val = 3.14;

    @log
    someFunc(args) {
        console.log(args);
        console.log(this.val);
    }
}

var t = new Test();

t.val = 4;

t.someFunc(23); // should log 'SomeFunc called'