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
  var Backbone = require('backbone');
  var util = require('app/models/util');

  var ChannelMetadata = Backbone.Model.extend({
    constructor: function(channel) {
      Backbone.Model.call(this);
      this.channel = channel;
    },

    url: function() {
      return util.apiUrl(this.channel, 'metadata', 'posts');
    },

    avatarUrl: function() {
      return util.apiUrl(this.channel, 'media', 'avatar');
    },

    fetch: function(options) {
      console.log('fetch called');
      Backbone.Model.prototype.fetch.call(this, _.extend(options || {}, {
        success: function() {
          this.set({});
          if (options && options.success) options.success();
        }
      }));
    },

    set: function(attributes) {
      Backbone.Model.prototype.set.call(this, attributes, {silent: true});
      this.title = this.get('title');
      this.description = this.get('description');
      this.creationDate = this.get('creation_date');
      this.channelType = this.get('channel_type');
      this.accessModel = this.get('access_model');
      this.change();
    }
  });

  return ChannelMetadata;
});