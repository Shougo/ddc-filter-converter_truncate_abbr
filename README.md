# ddc-converter_truncate_abbr

Truncate abbr converter for ddc.vim

This filter truncates abbr.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

## Configuration

```vim
call ddc#custom#patch_global('sourceOptions', {
      \ '_': {
      \   'converters': ['converter_truncate_abbr'],
      \ }
      \})
```
