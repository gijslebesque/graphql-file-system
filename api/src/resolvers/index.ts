import { mergeResolvers } from "@graphql-tools/merge";

import { uploadResolver } from "./upload-resolver";

const merged = [uploadResolver];

export const resolvers = mergeResolvers(merged);
