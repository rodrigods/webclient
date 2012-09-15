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
  var api = require('app/util/api');
  var Backbone = require('backbone');

  var ChannelMetadata = Backbone.Model.extend({
    constructor: function(channel) {
      Backbone.Model.call(this);
      this.channel = channel;
    },

    url: function() {
      return api.url(this.channel, 'metadata', 'posts');
    },

    avatarUrl: function() {
      return api.avatarUrl(this.channel);
    },

    title: function() {
      return this.get('title');
    },

    description: function() {
      return this.get('description');
    },

    creationDate: function() {
      return this.get('creation_date');
    },

    channelType: function() {
      return this.get('channel_type');
    },

    accessModel: function() {
      return this.get('access_model');
    },

    saveAvatar: function(file, credentials, callbacks) {
      var auth = credentials.toAuthorizationHeader();
      var data = this._constructAvatarData(file, credentials);
      $.ajax({
        type: 'PUT',
        url: this.avatarUrl(),
        headers: {'Authorization': auth},
        xhrFields: {withCredentials: true},
        data: data,
        processData: false,
        contentType: false,
        success: callbacks.success,
        error: callbacks.error
      });
    },

    _constructAvatarData: function(file, credentials) {
      var data = new FormData;
      data.append('content-type', file.type);
      data.append('data', file);
      return data;
    }
  });

  return ChannelMetadata;
});
