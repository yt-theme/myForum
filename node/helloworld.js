const Gtk = imports.gi.Gtk
const GLib = imports.gi.GLib
Gtk.init(null)
let mainloop = new GLib.MainLoop(null, null)
let w = new Gtk.Window()
w.show_all()
mainloop.run()