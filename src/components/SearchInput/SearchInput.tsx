import { Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { UidMixin } from '@/mixins';
import { Input, InputGroup } from '../Form';
import { Popover } from '../Popover';
import { Button } from '../Button';
import { Doc } from '@/api';

interface Props {
    uid?: string;
    value?: string | null;
    placeholder?: string;
    ariaLabel?: string;
    popoverVisible?: boolean;
    compact?: boolean;
}

@Doc.component('SearchInput')
@Doc.event('search', 'Triggered when the search button is clicked or enter is pressed from the keyboard.')
@Doc.event('autoComplete', 'Trigerred when the value in the SearchInput is changed. \n NOTE: This event will get trigerred only if there are children components in the suggestion.')
export class SearchInput extends mixins(UidMixin) {
    @Doc.prop('Value set in the Search Input', { default: '', type: String })
    public value!: string;

    @Doc.prop('Placeholder in case the SearchInput is empty', { type: String, default: '' })
    public placeholder!: string;

    @Doc.prop('Aria Label', { type: String, default: 'Search Input' })
    public ariaLabel!: string;

    @Doc.prop('whether search input is compact', { type: Boolean, default: false })
    public compact!: boolean;

    public $tsxProps!: Readonly<{}> & Readonly<Props>;
    private searchValue: string = this.value;

    @Watch('value')
    public handleNewValue(newValue: string) {
        this.searchValue = newValue;
        this.$emit('input', this.searchValue);
    }

    private handleSearchClick() {
        this.emitSearch();
    }

    private setCurrentValue(newValue: string) {
        this.searchValue = newValue;
        this.emitSearch();
        this.$emit('update:value', this.searchValue);
    }

    private handleKeyboardSearch({ keyCode }: KeyboardEvent) {
        if (keyCode === 13) {
            this.emitSearch();
        } else if (this.$slots.default && this.$slots.default.length > 0) {
            this.emitAutoComplete();
        }
    }

    private emitSearch() {
        this.$emit('search', this.searchValue);
    }

    private emitAutoComplete() {
        this.$emit('autoComplete', this.searchValue);
    }

    public render() {
        const suggestionList = this.$slots.default;
        const enableSuggest = suggestionList && suggestionList.length > 0;
        return (
            <div class='fd-search-input'>
                {enableSuggest === true ? (<Popover noArrow={true} popoverVisible={false}>
                    <div class='fd-combobox-control' slot='control' >
                        <InputGroup afterClass={'fd-input-group__addon--button'} compact={this.compact}>
                            <Input
                                value={this.searchValue}
                                placeholder={this.placeholder}
                                nativeOn-keyup={this.handleKeyboardSearch}
                                on-input={this.setCurrentValue}
                                compact={this.compact}
                            />
                            <Button styling='light' slot='after' icon='search' on-click={this.handleSearchClick} />
                        </InputGroup>
                    </div>
                    {suggestionList}
                </Popover>) : <div class='fd-combobox-control' slot='control'>
                        <InputGroup afterClass={'fd-input-group__addon--button'} compact={this.compact}>
                            <Input
                                value={this.searchValue}
                                placeholder={this.placeholder}
                                nativeOn-keyup={this.handleKeyboardSearch}
                                on-input={this.setCurrentValue}
                                compact={this.compact}
                            />
                            <Button
                                styling='light'
                                slot='after'
                                icon='search'
                                on-click={this.handleSearchClick}
                            />
                        </InputGroup>
                    </div>}
            </div>
        );
    }
}
