/*
 * Copyright 2012 Denis Washington <denisw@online.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function(require) {
  var _ = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/AvatarDialog.html');

  var AvatarDialog = Backbone.View.extend({
    className: 'avatar-dialog',
    events: {'click .apply': '_uploadAvatar'},

    render: function() {
      this.$el.html(_.template(template));
    },

    _uploadAvatar: function(event) {
      event.preventDefault();
      var file = this.$('.avatar-file').get(0).files[0];
      var credentials = this.options.credentials;
      var self = this;
      this.model.saveAvatar(file, credentials, {
        success: function() {
          self.$el.remove();
        },
        error: function(event) {
          console.log(event);
        }
      });
    }
  });

  return AvatarDialog;
});
