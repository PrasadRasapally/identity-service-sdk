import EmployeeOidcUserInfo from '../../src/employeeOidcUserInfo';
import dummy from '../dummy';

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
                        dummy.lastName,
                        dummy.emailAddress
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
            const expectedGiven_name = dummy.firstName;

            /*
             act
             */
            const objectUnderTest =
                new EmployeeOidcUserInfo(
                    expectedGiven_name,
                    dummy.lastName,
                    dummy.emailAddress
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
                        dummy.firstName,
                        null,
                        dummy.emailAddress
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
            const expectedFamily_name = dummy.lastName;

            /*
             act
             */
            const objectUnderTest =
                new EmployeeOidcUserInfo(
                    dummy.firstName,
                    expectedFamily_name,
                    dummy.emailAddress
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
                        dummy.firstName,
                        dummy.lastName,
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
            const expectedEmail = dummy.emailAddress;

            /*
             act
             */
            const objectUnderTest =
                new EmployeeOidcUserInfo(
                    dummy.firstName,
                    dummy.lastName,
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
