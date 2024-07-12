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

import {DatabricksConnection} from '@malloydata/db-databricks';
import {
  ConfigOptions,
  DatabricksConnectionConfig,
} from '../../common/types/connection_manager_types';
import {GenericConnection} from '../../common/types/worker_message_types';
import invariant from "tiny-invariant";

export const createDatabricksConnection = async (
  client: GenericConnection,
  connectionConfig: DatabricksConnectionConfig,
  {rowLimit, useKeyStore}: ConfigOptions
): Promise<DatabricksConnection> => {
  useKeyStore ??= true;
  const {hostname, http_path, auth_token, catalog, schema} = connectionConfig;
  invariant(hostname, 'hostname required');
  invariant(http_path, 'http_path required');

  let token: string;
  if (useKeyStore) {
    token = await client.sendRequest('malloy/getSecret', {
      key: `connections.${connectionConfig.id}.auth_token`,
    });
  } else {
    invariant(auth_token, 'auth_token required');
    token = auth_token;
  }

  const connOptions = {
    server_hostname: hostname,
    http_path,
    auth_token: token,
    catalog,
    schema,
  };

  console.info('Creating databricks connection with', connOptions);
  const connection = new DatabricksConnection(
    connectionConfig.name,
    connOptions,
    {
      rowLimit,
    }
  );
  return connection;
};
