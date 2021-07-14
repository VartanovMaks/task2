module.exports = {
  deleteExtraFields: (objectToNormalize = {}, fieldsToRemove) => {
    fieldsToRemove.forEach((field) => {
      delete objectToNormalize[field];
    });

    return objectToNormalize;
  }
};
