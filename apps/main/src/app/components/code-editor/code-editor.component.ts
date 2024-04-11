import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { MatFormField } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'taf-code-editor',
  standalone: true,
  imports: [CommonModule,
    CodeEditorModule, MatFormField,
    ReactiveFormsModule, MatAutocompleteTrigger,
    MatAutocomplete, MatOption, MatInput],
  template: `

<form>
    <mat-form-field>
      <mat-label>Number</mat-label>
      <input #input
             type="text"
             placeholder="Pick one"
             matInput
             [formControl]="myControl"
             [matAutocomplete]="auto"
             (input)="filter()"
             (focus)="filter()">
      <mat-autocomplete requireSelection #auto="matAutocomplete">
        @for (language of filteredLanguages; track language) {
          <mat-option [value]="language">{{ language }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
</form>

    <ngs-code-editor [theme]="theme" [codeModel]="model"
                     (valueChanged)="onCodeChanged($event)"></ngs-code-editor>

  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ngs-code-editor {
      height: 100%;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true
    }
  ]
})
export class CodeEditorComponent implements ControlValueAccessor {

  onChange: (code: string) => void;
  onTouch: () => void;


  theme = 'vs-dark';

  model: CodeModel = {
    language: 'typescript',
    uri: 'main.json',
    value: '{}'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');

  languages = [
    'plaintext',
    'abap',
    'apex',
    'azcli',
    'bat',
    'bicep',
    'cameligo',
    'clojure',
    'coffeescript',
    'c',
    'cpp',
    'csharp',
    'csp',
    'css',
    'cypher',
    'dart',
    'dockerfile',
    'ecl',
    'elixir',
    'flow9',
    'fsharp',
    'freemarker2',
    'go',
    'graphql',
    'handlebars',
    'hcl',
    'html',
    'ini',
    'java',
    'javascript',
    'julia',
    'kotlin',
    'less',
    'lexon',
    'lua',
    'liquid',
    'm3',
    'markdown',
    'mdx',
    'mips',
    'msdax',
    'mysql',
    'objective-c',
    'pascal',
    'pascaligo',
    'perl',
    'pgsql',
    'php',
    'pla',
    'postiats',
    'powerquery',
    'powershell',
    'proto',
    'pug',
    'python',
    'qsharp',
    'r',
    'razor',
    'redis',
    'redshift',
    'restructuredtext',
    'ruby',
    'rust',
    'sb',
    'scala',
    'scheme',
    'scss',
    'shell',
    'sol',
    'aes',
    'sparql',
    'sql',
    'st',
    'swift',
    'systemverilog',
    'verilog',
    'tcl',
    'twig',
    'typescript',
    'vb',
    'wgsl',
    'xml',
    'yaml',
    'json'
  ];


  filteredLanguages: string[];

  constructor() {
    this.filteredLanguages = [...this.languages];
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredLanguages = this.languages.filter(o => o.toLowerCase().includes(filterValue));
  }


  writeValue(code: string): void {
    this.model = { ...this.model, value: code };
  }

  registerOnChange(fn: (code: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  onCodeChanged(code: string) {
    this.onChange(code);
    this.onTouch();
  }
}
