/*
 * Copyright 2023 Google LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {LitElement, html} from 'lit';
import {
  provideVSCodeDesignSystem,
  vsCodeCheckbox,
  vsCodeRadio,
  vsCodeTextField,
} from '@vscode/webview-ui-toolkit';
import {DatabricksConnectionConfig} from '../../../../common/types/connection_manager_types';
import {customElement, property} from 'lit/decorators.js';
import {styles} from './connection_editor.css';

provideVSCodeDesignSystem().register(
  vsCodeCheckbox(),
  vsCodeRadio(),
  vsCodeTextField()
);

@customElement('databricks-connection-editor')
export class DatabricksConnectionEditor extends LitElement {
  static override styles = [styles];

  @property({type: Object})
  config!: DatabricksConnectionConfig;
  @property()
  setConfig!: (config: DatabricksConnectionConfig) => void;

  override render() {
    return html`<table>
      <tbody>
        <tr>
          <td class="label-cell">
            <label>Name:</label>
          </td>
          <td>
            <vscode-text-field
              value=${this.config.name}
              @input=${({target: {value}}: {target: HTMLInputElement}) => {
                this.setConfig({...this.config, name: value});
              }}
            ></vscode-text-field>
          </td>
        </tr>
        <tr>
          <td class="label-cell">
            <label>Hostname:</label>
          </td>
          <td>
            <vscode-text-field
              value=${this.config.hostname || ''}
              @input=${({target: {value}}: {target: HTMLInputElement}) => {
                this.setConfig({...this.config, hostname: value});
              }}
            ></vscode-text-field>
          </td>
        </tr>
        <tr>
          <td class="label-cell">
            <label>HTTP Path:</label>
          </td>
          <td>
            <vscode-text-field
              value=${this.config.http_path}
              @input=${({target: {value}}: {target: HTMLInputElement}) => {
                this.setConfig({...this.config, http_path: value});
              }}
            ></vscode-text-field>
          </td>
        </tr>
        <tr>
          <td class="label-cell">
            <label>Auth Token:</label>
          </td>
          <td>
            <secret-editor
              .secret=${this.config.auth_token}
              .setSecret=${(secret: string) => {
                this.setConfig({...this.config, auth_token: secret});
              }}
            ></secret-editor>
          </td>
        </tr>
        <tr>
          <td class="label-cell">
            <label>Catalog:</label>
          </td>
          <td>
            <vscode-text-field
              value=${this.config.catalog || ''}
              @input=${({target: {value}}: {target: HTMLInputElement}) => {
                this.setConfig({...this.config, catalog: value});
              }}
            ></vscode-text-field>
          </td>
        </tr>
        <tr>
          <td class="label-cell">
            <label>Schema:</label>
          </td>
          <td>
            <vscode-text-field
              value=${this.config.schema || ''}
              @input=${({target: {value}}: {target: HTMLInputElement}) => {
                this.setConfig({...this.config, schema: value});
              }}
              placeholder="Optional"
            ></vscode-text-field>
          </td>
        </tr>
      </tbody>
    </table>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'databricks-connection-editor': DatabricksConnectionEditor;
  }
}
