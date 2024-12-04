# DigiSus - Emission Tool Tests

## Prerequisites
Before running the tests, please perform the following steps:

1. **Python**: Make sure you have Python 3.8 or later installed. You can download it from the [official Python website](https://www.python.org/downloads/).
   
2. **Install Node.js**: Download and install Node.js from the [official Node.js website](https://nodejs.org/).

3. **Create and activate a new virtual environment**: 
   - To create a virtual environment, make sure you are in the `robot_tests` directory.
   - Follow these instructions to create and activate a new virtual environment: [Creating and Using Virtual Environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#create-and-use-virtual-environments).

4. **Install requirements using pip**: After activating the virtual environment, install the needed packages using `pip`:
```shell
pip install -r requirements.txt
```

5. **Initialize the Browser library**:
```shell
rfbrowser init
```

## Running tests 
To run the tests, make sure you are in the `robot_tests` directory, and run the following command:
```shell
robot -d output tests/
```
- `-d output`: This specifies the output directory for the test results.
- `tests/`: This is the directory where your test cases are located.  

After the tests have completed running, you can view the test report by opening the generated HTML report located in the `output` directory. You can open the report in your web browser.

## Developing tests
For guidelines on writing test cases, refer to the following resource:
- [How to Write Good Test Cases](https://github.com/robotframework/HowToWriteGoodTestCases/blob/master/HowToWriteGoodTestCases.rst)