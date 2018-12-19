import { assert } from 'chai';
import { Doc } from '@/api';
import Vue from 'vue';

describe('Documentation of', () => {
  describe('TestComponent', () => {

    class Person {

    }

    @Doc.component('TestComponent')
    class TestComponent extends Vue {

      @Doc.prop('anyProp')
      public anyProp!: any;

      @Doc.prop('firstName', String)
      public firstName!: string;

      @Doc.prop({ type: String, default: null })
      public label!: string | null;

      @Doc.prop(Person)
      public person!: Person | null;
    }
    const tc = new TestComponent();
    const { $componentDocumentation: doc }  = tc.$options;
    describe('is defined', () => {
      assert.isDefined(doc);
      if(doc == null) {
        return;
      }
      it('props are correct', () => {
        assert.strictEqual(String, doc.getProp('firstName').vueTypes);
        assert.strictEqual(null, doc.getProp('anyProp').vueTypes);
      });

      it('person prop', () => {
        assert.deepStrictEqual({
          required: false,
          type: Person,
          default: undefined,
         }, doc.getProp('person').vuePropOptions);
      });

      it('label prop correct', () => {
        assert.deepStrictEqual({
          required: false,
          type: String,
          default: null,
         }, doc.getProp('label').vuePropOptions);
      });
    });
  });
});
