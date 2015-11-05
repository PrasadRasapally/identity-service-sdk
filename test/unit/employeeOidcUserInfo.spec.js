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
                        dummy.userId
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
                    dummy.userId
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
                        dummy.userId
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
                    dummy.userId
                );

            /*
             assert
             */
            const actualFamily_name =
                objectUnderTest.family_name;

            expect(actualFamily_name).toEqual(expectedFamily_name);

        });

        it('throws if sub is null', () => {
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
            expect(constructor).toThrowError(TypeError, 'sub required');

        });
        it('sets sub', () => {
            /*
             arrange
             */
            const expectedSub = dummy.userId;

            /*
             act
             */
            const objectUnderTest =
                new EmployeeOidcUserInfo(
                    dummy.firstName,
                    dummy.lastName,
                    expectedSub
                );

            /*
             assert
             */
            const actualSub =
                objectUnderTest.sub;

            expect(actualSub).toEqual(expectedSub);

        });
    });
});
