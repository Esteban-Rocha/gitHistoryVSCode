import { assert } from 'chai';
import { RefType } from '../../../../../src/adapter';
import { IRefParser } from '../../../../../src/adapter/parsers/refs/contracts';
import { TagRefParser } from '../../../../../src/adapter/parsers/refs/parsers/tagRefParser';

suite('Adapter Parser Ref - TagRefParser', () => {
    let parser: IRefParser;
    suiteSetup(() => {
        parser = new TagRefParser();
    });

    test('null,undefined and empty strings cannot be parsed', () => {
        assert.isFalse(parser.canParse(''), 'Parsing of empty string is not possible');
        // tslint:disable-next-line:prefer-type-cast no-any
        assert.isFalse(parser.canParse(null as any), 'Parsing of null is not possible');
        // tslint:disable-next-line:prefer-type-cast no-any
        assert.isFalse(parser.canParse(undefined as any), 'Parsing of undefined is not possible');
    });

    test('refs/tags/translation/20170127.01', () => {
        const refContent = 'refs/tags/translation/20170127.01';
        assert.isTrue(parser.canParse(refContent), 'Parsing failed');
        assert.isObject(parser.parse(refContent), 'Should be an object');
        assert.equal(parser.parse(refContent).name, 'translation/20170127.01', 'Name is wrong');
        assert.equal(parser.parse(refContent).type, RefType.Tag, 'Type is wrong');
    });

    test('tag: refs/tags/0.2.0', () => {
        const refContent = 'tag: refs/tags/0.2.0';
        assert.isTrue(parser.canParse(refContent), 'Parsing failed');
        assert.isObject(parser.parse(refContent), 'Should be an object');
        assert.equal(parser.parse(refContent).name, '0.2.0', 'Name is wrong');
        assert.equal(parser.parse(refContent).type, RefType.Tag, 'Type is wrong');
    });
});
