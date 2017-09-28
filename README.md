# lazy-more-filter
## Features:
* lazy-calculate
* multiple-filters
* sort

## update logs
* 2016/11/21 - add sort feature: able to sort data in each filter, for more detail, please check [lazy-more-filter.ts](https://github.com/josephmeng/lazy-more-filter/blob/master/src/lazy-more-filter.ts#L78-L82);


## How to run and test it
Run _npm start_ in root path and modify test.ts file (modify dummy data and test case), console will print result automatically. 
For more details, please see src/test.ts file.

Read and Write a test case

it's very easy for us to create and understand a  testcase. Look at this code, it is similar to JSON but it’s more powerful than JSON, we use typescript to write a JSON-like test case and it takes many benefits. 
First of all, it have code assist when we write the test case, however it can also help us to verify whether our test case spelling are correct. It has description to describe what this test case want to test, and it has input to help us to input content into html element automatically, it has grid-checks and checks to help us to check test result automatically, etc.
Secondly, use JSON-like test case can achieve readability. it has action array to define what we want the browser to do in order synchronously, just like a human do in real browser.
Thirdly, JSON-like test case can inline any javascript code so that we can create the test case dynamically in different conditions.

Normally, if you give me the process and the data, I can write a test case in a few minutes, and you can understand the test case very easily.
