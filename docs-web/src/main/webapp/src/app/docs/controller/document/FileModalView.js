'use strict';

/**
 * File modal view controller.
 */
angular.module('docs').controller('FileModalView', function ($uibModalInstance, $scope, $state, $stateParams, $sce, Restangular, $transitions, $translate) {
  var setFile = function (files) {
    // Search current file
    _.each(files, function (value) {
      if (value.id === $stateParams.fileId) {
        $scope.file = value;
        $scope.trustedFileUrl = $sce.trustAsResourceUrl('../api/file/' + $stateParams.fileId + '/data');
        // console.error('../api/file/' + $stateParams.fileId + '/data');
      }
    });
  };

  // Load files
  Restangular.one('file/list').get({ id: $stateParams.id }).then(function (data) {
    $scope.files = data.files;
    setFile(data.files);
    $scope.isTranslated      = false;
    $scope.originalFileUrl   = $scope.trustedFileUrl
    $scope.translatedFileUrl = null;

    // File not found, maybe it's a version
    if (!$scope.file) {
      Restangular.one('file/' + $stateParams.fileId + '/versions').get().then(function (data) {
        setFile(data.files);
      });
    }
  });

  const deeplLangMap = {
    "en":     'EN-GB',   // 或者 'EN-US'
    "fr":     'FR',
    "de":     'DE',
    "it":     'IT',
    "es":     'ES',
    "pt":     'PT-PT',   // 欧洲葡萄牙语，若你需要巴西葡萄牙语用 'PT-BR'
    "el":     'EL',
    "ru":     'RU',
    "pl":     'PL',
    'zh_CN':'ZH',      // 简体中文，可选 'ZH-HANS'
    'zh_TW':'ZH-HANT' // 繁体中文
  };
  console.error($translate.use());
  console.error(deeplLangMap[$translate.use()]);

  $scope.toggleTranslate = function() {

    if (!$scope.isTranslated) {
      Restangular.all('/file/translateFile').post( {
        fileId: $stateParams.fileId,
        targetLang: deeplLangMap[$translate.use()]
      }).then(function(data) {
        $scope.translatedFileUrl = $sce.trustAsResourceUrl('../api/file/' + data.fileId + '/data');
        $scope.trustedFileUrl    = $scope.translatedFileUrl;
        $scope.isTranslated      = true;
      }, function(err){
        alert("翻译失败：" + err.data.message);
      });
    } else {
      // 恢复原文
      $scope.trustedFileUrl = $scope.originalFileUrl;
      $scope.isTranslated   = false;
    }
  };


  /**
   * Return the next file.
   */
  $scope.nextFile = function () {
    var next = undefined;
    _.each($scope.files, function (value, key) {
      if (value.id === $stateParams.fileId) {
        next = $scope.files[key + 1];
      }
    });
    return next;
  };

  /**
   * Return the previous file.
   */
  $scope.previousFile = function () {
    var previous = undefined;
    _.each($scope.files, function (value, key) {
      if (value.id === $stateParams.fileId) {
        previous = $scope.files[key - 1];
      }
    });
    return previous;
  };

  /**
   * Navigate to the next file.
   */
  $scope.goNextFile = function () {
    var next = $scope.nextFile();
    if (next) {
      $state.go('^.file', { id: $stateParams.id, fileId: next.id });
    }
  };

  /**
   * Navigate to the previous file.
   */
  $scope.goPreviousFile = function () {
    var previous = $scope.previousFile();
    if (previous) {
      $state.go('^.file', { id: $stateParams.id, fileId: previous.id });
    }
  };

  /**
   * Open the file in a new window.
   */
  $scope.openFile = function () {
    window.open('../api/file/' + $stateParams.fileId + '/data');
  };

  /**
   * Open the file content a new window.
   */
  $scope.openFileContent = function () {
    window.open('../api/file/' + $stateParams.fileId + '/data?size=content');
  };

  /**
   * Print the file.
   */
  $scope.printFile = function () {
    var popup = window.open('../api/file/' + $stateParams.fileId + '/data', '_blank');
    popup.onload = function () {
      popup.print();
      popup.close();
    }
  };

  /**
   * Close the file preview.
   */
  $scope.closeFile = function () {
    $uibModalInstance.dismiss();
  };

  // Close the modal when the user exits this state
  var off = $transitions.onStart({}, function(transition) {
    if (!$uibModalInstance.closed) {
      if (transition.to().name === $state.current.name) {
        $uibModalInstance.close();
      } else {
        $uibModalInstance.dismiss();
      }
    }
    off();
  });

  /**
   * Return true if we can display the preview image.
   */
  $scope.canDisplayPreview = function () {
    return $scope.file && $scope.file.mimetype !== 'application/pdf';
  };
});