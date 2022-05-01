import { fileDefs } from "./file-schema";

import { mergeTypeDefs } from "@graphql-tools/merge";

const types = [fileDefs];

export const typeDefs = mergeTypeDefs(types);
