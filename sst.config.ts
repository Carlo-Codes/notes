import { SSTConfig } from "sst";
import { StorageStack } from './stacks/storageStack';
import { Api } from "sst/constructs";
import { ApiStack } from "./stacks/apiStack";
import { AuthStack } from "./stacks/authStack";
import { FrontendStack } from "./stacks/frontendStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "eu-west-2",
      stage : "CarloNotes"
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);
  }
} satisfies SSTConfig;
