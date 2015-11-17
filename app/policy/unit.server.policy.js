'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());


exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/unit',
            permissions: ['get', 'post']
        }, {
            resources: '/api/unit/:uid',
            permissions: '*'
        },
            {
                resources: '/api/unitdiv/:uid/:qty',
                permissions: ['get']
            },
            {
                resources: '/api/unitmul/:uid/:qty',
                permissions: ['get']
            }
        ]
    }, {
        roles: ['user'],
        allows: [{
            resources: '/api/unit',
            permissions: ['get']
        }, {
            resources: '/api/unit/:uid',
            permissions: ['get']
        },
            {
                resources: '/api/unitdiv/:uid/:qty',
                permissions: ['get']
            },
            {
                resources: '/api/unitmul/:uid/:qty',
                permissions: ['get']
            }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/unit',
            permissions: ['get']
        }, {
            resources: '/api/unit/:uid',
            permissions: ['get']
        },
            {
                resources: '/api/unitdiv/:uid/:qty',
                permissions: ['get']
            },
            {
                resources: '/api/unitmul/:uid/:qty',
                permissions: ['get']
            }]
    }]);
};

exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    if (req.unit && req.user && req.unit.user.id === req.user.id) {
        return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred.
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};