import EmployeeOidcUserInfo from '../../src/employeeOidcUserInfo';

/*
 dummy data fields
 */
const validFirstName = 'given_name';
const validLastName = 'family_name';
const validEmailAddress = 'test.email@email.com';

/*
 test methods
 */
describe('EmployeeOidcUserInfo class', () => {
    describe('constructor', () => {
        it('throws if given_name is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new EmployeeOidcUserInfo(
                        null,
                        validLastName,
                        validEmailAddress
                    );

            /*
             act/assert
             */
            expect(constructor).toThrowError(TypeError, 'given_name required');

        });
        it('sets given_name', () => {
            /*
             arrange
             */
            const expectedGiven_name = validFirstName;

            /*
             act
             */
            const objectUnderTest =
                new EmployeeOidcUserInfo(
                    expectedGiven_name,
                    validLastName,
                    validEmailAddress
                );

            /*
             assert
             */
            const actualGiven_name =
                objectUnderTest.given_name;

            expect(actualGiven_name).toEqual(expectedGiven_name);

        });
        it('throws if family_name is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new EmployeeOidcUserInfo(
                        validFirstName,
                        null,
                        validEmailAddress
                    );

            /*
             act/assert
             */
            expect(constructor).toThrowError(TypeError, 'family_name required');

        });
        it('sets family_name', () => {
            /*
             arrange
             */
            const expectedFamily_name = validLastName;

            /*
             act
             */
            const objectUnderTest =
                new EmployeeOidcUserInfo(
                    validFirstName,
                    expectedFamily_name,
                    validEmailAddress
                );

            /*
             assert
             */
            const actualFamily_name =
                objectUnderTest.family_name;

            expect(actualFamily_name).toEqual(expectedFamily_name);

        });

        it('throws if email is null', () => {
            /*
             arrange
             */
            const constructor =
                () =>
                    new EmployeeOidcUserInfo(
                        validFirstName,
                        validLastName,
                        null
                    );

            /*
             act/assert
             */
            expect(constructor).toThrowError(TypeError, 'email required');

        });
        it('sets email', () => {
            /*
             arrange
             */
            const expectedEmail = validEmailAddress;

            /*
             act
             */
            const objectUnderTest =
                new EmployeeOidcUserInfo(
                    validFirstName,
                    validLastName,
                    expectedEmail
                );

            /*
             assert
             */
            const actualEmail =
                objectUnderTest.email;

            expect(actualEmail).toEqual(expectedEmail);

        });
    });
});
