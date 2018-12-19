import { Doc } from '@/api';
import { Identifier, Popover } from '@/components';
import TsxComponent from '@/vue-tsx';

@Doc.component('ShellBarUserMenu')
@Doc.defaultSlot('Menu Items (FdMenuItem)')
@Doc.slot('control', 'Popover Control (optional). Defaults to a specially configured FdIdentifier.')
export class ShellBarUserMenu extends TsxComponent<{}> {
    public render() {
        const control = this.$slots.control;
        return (
            <div class='fd-user-menu'>
                <Popover placement='right'>
                    <div class='fd-user-menu__control' slot='control' title='Experimental'>
                        {control}
                        {!control && (
                            <Identifier size='s' backgroundColor='accent-6' circle={true} icon='person-placeholder' />
                        )}
                    </div>
                    {this.$slots.default}
                </Popover>
            </div>
        );
    }
}
